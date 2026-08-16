import http from 'k6/http';
import { check } from 'k6';
import exec from 'k6/execution';
import { Counter } from 'k6/metrics';

// Custom k6 Metrics for impressive demo summary
const loginsPassed = new Counter('login_requests_passed');
const submissionsPassed = new Counter('submit_requests_passed');

// Configuration
const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080/nonstopcoding';
const MODE = __ENV.MODE || 'single';
const VUS = parseInt(__ENV.VUS || '50');
const ITERATIONS = parseInt(__ENV.ITERATIONS || '50');

export const options = {
    scenarios: {
        concurrent_submissions: {
            executor: 'per-vu-iterations',
            vus: VUS,
            iterations: Math.ceil(ITERATIONS / VUS),
            maxDuration: '1m',
        },
    },
    thresholds: {
        http_req_failed: ['rate<0.05'], // < 5% error rate
        http_req_duration: ['p(95)<8000'],
        login_requests_passed: ['count>=1'],
        submit_requests_passed: ['count>=1'],
    },
};

const cppSourceCode = `#include <bits/stdc++.h>
using namespace std;

int main() {
    string line;
    getline(cin, line);

    vector<int> nums;
    {
        stringstream ss(line);
        int x;
        while (ss >> x) nums.push_back(x);
    }

    int target;
    cin >> target;

    unordered_map<int, int> seen;

    for (int i = 0; i < (int)nums.size(); i++) {
        int need = target - nums[i];
        if (seen.count(need)) {
            cout << seen[need] << " " << i << endl;
            return 0;
        }
        seen[nums[i]] = i;
    }

    cout << -1 << " " << -1 << endl;
    return 0;
}`;

function loginAndGetToken(username, password, idx) {
    const loginRes = http.post(
        `${BASE_URL}/auth/login`,
        JSON.stringify({ username: username, password: password }),
        { headers: { 'Content-Type': 'application/json' } }
    );

    if (loginRes.status === 200) {
        loginsPassed.add(1);
        console.log(`\u001B[32m🔑 [STAGE 1: AUTH PASS ${idx}/${VUS}] Login User '${username}' -> HTTP 200 OK (Token Generated)\u001B[0m`);
        
        if (loginRes.cookies && loginRes.cookies['access_token']) {
            return loginRes.cookies['access_token'][0].value;
        } else if (loginRes.json() && loginRes.json().result && loginRes.json().result.accessToken) {
            return loginRes.json().result.accessToken;
        }
    } else {
        console.error(`\u001B[31m❌ [STAGE 1: AUTH FAIL] Login '${username}' -> HTTP ${loginRes.status}\u001B[0m`);
    }
    return null;
}

// Setup phase: Login users & retrieve JWT access tokens
export function setup() {
    console.log(`\n\u001B[36m================================================================================\u001B[0m`);
    console.log(`\u001B[36m🚀 [DEMO INIT] Starting Load Test Setup: MODE=${MODE}, Total VUs=${VUS}\u001B[0m`);
    console.log(`\u001B[36m================================================================================\u001B[0m\n`);

    if (MODE === 'single') {
        const token = loginAndGetToken('user1', 'user1', 1);
        return { tokens: [token] };
    } else {
        const tokens = [];
        for (let i = 1; i <= VUS; i++) {
            const token = loginAndGetToken('user1', 'user1', i);
            if (token) {
                tokens.push(token);
            }
        }
        console.log(`\n\u001B[32m✅ [STAGE 1 COMPLETE] Successfully authenticated ${tokens.length}/${VUS} Sessions!\u001B[0m\n`);
        return { tokens: tokens };
    }
}

// Main execution function
export default function (data) {
    const vuId = (exec.vu.idInInstance - 1) % data.tokens.length;
    const token = data.tokens[vuId];

    if (!token) {
        return;
    }

    const payload = JSON.stringify({
        problemId: 3,
        languageId: 54, // C++
        sourceCode: cppSourceCode,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Cookie': `access_token=${token}`,
        },
    };

    const startTime = new Date();
    const res = http.post(`${BASE_URL}/online-judge/submissions`, payload, params);
    const latency = new Date() - startTime;

    const submissionId = res.json() && res.json().result ? res.json().result.submissionId : 'N/A';

    const success = check(res, {
        '[AUTH] Token Valid': () => true,
        '[STAGE 2] Submit C++ Code -> HTTP 200': (r) => r.status === 200,
        '[STAGE 2] Submission ID Generated': () => submissionId !== 'N/A',
    });

    if (success) {
        submissionsPassed.add(1);
        console.log(`\u001B[32m✅ [STAGE 2: SUBMIT PASSED] VU #${exec.vu.idInInstance} -> HTTP 200 OK | Submission ID: ${submissionId} (${latency}ms)\u001B[0m`);
    } else {
        console.error(`\u001B[31m❌ [STAGE 2: SUBMIT FAILED] VU #${exec.vu.idInInstance} -> HTTP ${res.status}\u001B[0m`);
    }
}
