package com.zplus.counselling.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("!test") // Exclude from test profile
public class RabbitMQConfig {

    public static final String TEST_COMPLETION_QUEUE = "test.completion.queue";
    public static final String EMAIL_NOTIFICATION_QUEUE = "email.notification.queue";
    public static final String REPORT_GENERATION_QUEUE = "report.generation.queue";
    
    public static final String TEST_EXCHANGE = "test.exchange";
    public static final String NOTIFICATION_EXCHANGE = "notification.exchange";

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter());
        return template;
    }

    @Bean
    public SimpleRabbitListenerContainerFactory rabbitListenerContainerFactory(ConnectionFactory connectionFactory) {
        SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(messageConverter());
        return factory;
    }

    // Test-related queues and exchanges
    @Bean
    public TopicExchange testExchange() {
        return new TopicExchange(TEST_EXCHANGE);
    }

    @Bean
    public Queue testCompletionQueue() {
        return QueueBuilder.durable(TEST_COMPLETION_QUEUE).build();
    }

    @Bean
    public Binding testCompletionBinding() {
        return BindingBuilder.bind(testCompletionQueue())
            .to(testExchange())
            .with("test.completed");
    }

    // Notification-related queues and exchanges
    @Bean
    public TopicExchange notificationExchange() {
        return new TopicExchange(NOTIFICATION_EXCHANGE);
    }

    @Bean
    public Queue emailNotificationQueue() {
        return QueueBuilder.durable(EMAIL_NOTIFICATION_QUEUE).build();
    }

    @Bean
    public Queue reportGenerationQueue() {
        return QueueBuilder.durable(REPORT_GENERATION_QUEUE).build();
    }

    @Bean
    public Binding emailNotificationBinding() {
        return BindingBuilder.bind(emailNotificationQueue())
            .to(notificationExchange())
            .with("email.send");
    }

    @Bean
    public Binding reportGenerationBinding() {
        return BindingBuilder.bind(reportGenerationQueue())
            .to(notificationExchange())
            .with("report.generate");
    }
}