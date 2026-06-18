package com.swp391.coding_platform.configuration;

import com.swp391.coding_platform.entity.auth.RoleEntity;
import com.swp391.coding_platform.entity.enums.RoleName;
import com.swp391.coding_platform.entity.enums.UserStatus;
import com.swp391.coding_platform.entity.user.UserEntity;
import com.swp391.coding_platform.repository.auth.RoleRepository;
import com.swp391.coding_platform.repository.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Set;

@Slf4j
@Configuration
@Profile("dev") // Đã bỏ @RequiredArgsConstructor và @FieldDefaults
public class ApplicationInitConfig {

    // Đã bỏ khai báo biến PasswordEncoder ở đây

    @Bean
    ApplicationRunner applicationRunner(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder // <-- Inject trực tiếp thẳng vào parameter của Bean
    ) {
        log.info("Init application for dev environment...");

        return args -> {
            if (!userRepository.findByUsername("admin").isPresent()) {
                RoleEntity adminRole = roleRepository.findByName(RoleName.ADMIN)
                        .orElseGet(() -> roleRepository.save(RoleEntity.builder().name(RoleName.ADMIN).build()));

                UserEntity adminUser = UserEntity.builder()
                        .username("admin")
                        .passwordHash(passwordEncoder.encode("admin"))
                        .displayname("admin")
                        .email("admin@gmail.com")
                        .status(UserStatus.ACTIVE)
                        .roles(java.util.Collections.singleton(adminRole))
                        .build();

                userRepository.save(adminUser);

                log.warn("Dev admin user has been created. Please change the default password if needed.");
            }
        };
    }
}