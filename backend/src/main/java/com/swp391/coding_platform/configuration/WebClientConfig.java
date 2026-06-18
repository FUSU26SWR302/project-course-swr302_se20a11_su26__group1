package com.swp391.coding_platform.configuration;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import io.netty.resolver.DefaultAddressResolverGroup;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Configuration
@FieldDefaults(level = AccessLevel.PRIVATE)
public class WebClientConfig {

    @Value("${judge0.base-url}")
    String baseUrl;

    // Lấy giá trị timeout từ yml, mặc định là 20 giây nếu quên config
    @Value("${judge0.timeout:20s}")
    Duration timeout;

    @Bean
    public WebClient judge0WebClient() {
        int timeoutMillis = (int) timeout.toMillis();

        // Cấu hình HttpClient của Netty với 3 lớp bảo vệ (3-Layer Protection)
        HttpClient httpClient = HttpClient.create()
                .resolver(DefaultAddressResolverGroup.INSTANCE)

                // Lớp 1: Giới hạn thời gian thiết lập kết nối ban đầu (TCP Handshake)
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, timeoutMillis)

                // Lớp 2: Giới hạn thời gian chờ phản hồi toàn bộ (Tính từ lúc gửi xong Request)
                .responseTimeout(timeout)

                // Lớp 3: Giới hạn thời gian rảnh (Idle) khi Đọc/Ghi dữ liệu ở mức Socket
                .doOnConnected(connection ->
                        connection
                                .addHandlerLast(new ReadTimeoutHandler(timeoutMillis, TimeUnit.MILLISECONDS))
                                .addHandlerLast(new WriteTimeoutHandler(timeoutMillis, TimeUnit.MILLISECONDS))
                );

        // Nhúng HttpClient an toàn vào WebClient của Spring
        return WebClient.builder()
                .baseUrl(baseUrl)
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                // Bổ sung thêm Default Header nếu Judge0 của bạn yêu cầu API Key
                // .defaultHeader("X-Auth-Token", "your-secret-token")
                .build();
    }
}