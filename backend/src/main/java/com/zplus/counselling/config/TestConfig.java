package com.zplus.counselling.config;

import com.zplus.counselling.entity.mongodb.AssessmentTemplate;
import com.zplus.counselling.repository.mongodb.AssessmentTemplateRepository;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration;
import org.springframework.boot.autoconfigure.data.mongo.MongoRepositoriesAutoConfiguration;
import org.springframework.boot.autoconfigure.data.redis.RedisAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration;
import org.springframework.boot.autoconfigure.mail.MailSenderAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.*;
import org.springframework.data.repository.query.FluentQuery;

import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;

@Configuration
@Profile("test")
@EnableAutoConfiguration(exclude = {
    MongoAutoConfiguration.class,
    MongoDataAutoConfiguration.class,
    MongoRepositoriesAutoConfiguration.class,
    RedisAutoConfiguration.class,
    RabbitAutoConfiguration.class,
    MailSenderAutoConfiguration.class
})
public class TestConfig {

    @Bean
    @Primary
    public AssessmentTemplateRepository mockAssessmentTemplateRepository() {
        return new MockAssessmentTemplateRepository();
    }

    // Configure H2 to handle JSON columns
    @Bean
    @Profile("test")
    @ConfigurationProperties(prefix = "spring.jpa.properties.hibernate")
    public Map<String, String> testHibernateProperties() {
        Map<String, String> properties = new HashMap<>();
        properties.put("dialect", "com.zplus.counselling.config.H2JsonDialect");
        properties.put("format_sql", "true");
        properties.put("use_sql_comments", "false");
        return properties;
    }

    private static class MockAssessmentTemplateRepository implements AssessmentTemplateRepository {
        
        private final Map<String, AssessmentTemplate> templates = new HashMap<>();
        
        public MockAssessmentTemplateRepository() {
            // Initialize with mock data
            initializeMockData();
        }
        
        private void initializeMockData() {
            // Create mock MBTI template
            AssessmentTemplate mbtiTemplate = createMBTITemplate();
            templates.put(mbtiTemplate.getId(), mbtiTemplate);
            
            // Create mock personality template
            AssessmentTemplate personalityTemplate = createPersonalityTemplate();
            templates.put(personalityTemplate.getId(), personalityTemplate);
            
            // Create mock career template
            AssessmentTemplate careerTemplate = createCareerTemplate();
            templates.put(careerTemplate.getId(), careerTemplate);
        }
        
        private AssessmentTemplate createMBTITemplate() {
            AssessmentTemplate template = new AssessmentTemplate();
            template.setId("mbti-template-1");
            template.setTestType("MBTI");
            template.setVersion("1.0");
            template.setTitle("Myers-Briggs Type Indicator");
            template.setDescription("Discover your personality type based on Carl Jung's theory");
            template.setCategory("PERSONALITY");
            template.setEstimatedTimeMinutes(15);
            template.setTotalQuestions(10); // Simplified for testing
            template.setIsActive(true);
            template.setInstructions(Arrays.asList(
                "Answer each question based on your natural preferences",
                "There are no right or wrong answers"
            ));
            
            // Create dimensions
            List<AssessmentTemplate.Dimension> dimensions = Arrays.asList(
                createDimension("EI", "Extraversion vs Introversion", "Where you direct your energy"),
                createDimension("SN", "Sensing vs Intuition", "How you take in information")
            );
            template.setDimensions(dimensions);
            
            // Create sample questions
            template.setQuestions(createSampleQuestions());
            
            // Create scoring algorithm
            AssessmentTemplate.ScoringAlgorithm algorithm = new AssessmentTemplate.ScoringAlgorithm();
            algorithm.setType("DIMENSIONAL_SCORING");
            algorithm.setMethod("WEIGHTED_SUM");
            algorithm.setThresholds(Map.of("E", 50, "I", 50, "S", 50, "N", 50));
            template.setScoringAlgorithm(algorithm);
            
            // Create result types
            template.setResultTypes(createResultTypes());
            
            template.setCreatedAt(LocalDateTime.now());
            template.setUpdatedAt(LocalDateTime.now());
            
            return template;
        }
        
        private AssessmentTemplate createPersonalityTemplate() {
            AssessmentTemplate template = new AssessmentTemplate();
            template.setId("personality-template-1");
            template.setTestType("PERSONALITY");
            template.setVersion("1.0");
            template.setTitle("Personality Assessment");
            template.setDescription("Comprehensive personality evaluation");
            template.setCategory("PERSONALITY");
            template.setEstimatedTimeMinutes(10);
            template.setTotalQuestions(8);
            template.setIsActive(true);
            template.setInstructions(Arrays.asList("Answer honestly", "No right or wrong answers"));
            template.setQuestions(createSampleQuestions());
            template.setCreatedAt(LocalDateTime.now());
            template.setUpdatedAt(LocalDateTime.now());
            return template;
        }
        
        private AssessmentTemplate createCareerTemplate() {
            AssessmentTemplate template = new AssessmentTemplate();
            template.setId("career-template-1");
            template.setTestType("CAREER");
            template.setVersion("1.0");
            template.setTitle("Career Assessment");
            template.setDescription("Discover your ideal career path");
            template.setCategory("CAREER");
            template.setEstimatedTimeMinutes(12);
            template.setTotalQuestions(12);
            template.setIsActive(true);
            template.setInstructions(Arrays.asList("Think about your preferences", "Consider your interests"));
            template.setQuestions(createSampleQuestions());
            template.setCreatedAt(LocalDateTime.now());
            template.setUpdatedAt(LocalDateTime.now());
            return template;
        }
        
        private AssessmentTemplate.Dimension createDimension(String code, String name, String description) {
            AssessmentTemplate.Dimension dimension = new AssessmentTemplate.Dimension();
            dimension.setCode(code);
            dimension.setName(name);
            dimension.setDescription(description);
            return dimension;
        }
        
        private List<AssessmentTemplate.Question> createSampleQuestions() {
            List<AssessmentTemplate.Question> questions = new ArrayList<>();
            
            for (int i = 1; i <= 5; i++) {
                AssessmentTemplate.Question question = new AssessmentTemplate.Question();
                question.setId("q" + i);
                question.setText("Sample question " + i + "?");
                question.setType("SINGLE_CHOICE");
                question.setDimension("EI");
                question.setRequired(true);
                question.setCategory("GENERAL");
                
                // Create options
                List<AssessmentTemplate.Option> options = Arrays.asList(
                    createOption("a", "Option A", Map.of("E", 1, "I", 0)),
                    createOption("b", "Option B", Map.of("E", 0, "I", 1))
                );
                question.setOptions(options);
                
                questions.add(question);
            }
            
            return questions;
        }
        
        private AssessmentTemplate.Option createOption(String id, String text, Map<String, Integer> weights) {
            AssessmentTemplate.Option option = new AssessmentTemplate.Option();
            option.setId(id);
            option.setText(text);
            option.setWeights(weights);
            return option;
        }
        
        private Map<String, AssessmentTemplate.ResultType> createResultTypes() {
            Map<String, AssessmentTemplate.ResultType> resultTypes = new HashMap<>();
            
            AssessmentTemplate.ResultType introvert = new AssessmentTemplate.ResultType();
            introvert.setTitle("Introvert");
            introvert.setDescription("You prefer quiet, low-stimulus environments");
            introvert.setStrengths(Arrays.asList("Deep thinking", "Careful consideration"));
            introvert.setWeaknesses(Arrays.asList("May seem aloof", "Slow to speak up"));
            
            resultTypes.put("I", introvert);
            return resultTypes;
        }

        // Custom repository methods
        @Override
        public Optional<AssessmentTemplate> findByTestTypeAndIsActiveTrue(String testType) {
            return templates.values().stream()
                    .filter(t -> testType.equals(t.getTestType()) && Boolean.TRUE.equals(t.getIsActive()))
                    .findFirst();
        }

        @Override
        public List<AssessmentTemplate> findByIsActiveTrueOrderByCreatedAtDesc() {
            return templates.values().stream()
                    .filter(t -> Boolean.TRUE.equals(t.getIsActive()))
                    .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                    .toList();
        }

        @Override
        public List<AssessmentTemplate> findByCategoryAndIsActiveTrueOrderByCreatedAtDesc(String category) {
            return templates.values().stream()
                    .filter(t -> category.equals(t.getCategory()) && Boolean.TRUE.equals(t.getIsActive()))
                    .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                    .toList();
        }

        @Override
        public Optional<AssessmentTemplate> findByTestTypeAndVersionAndIsActiveTrue(String testType, String version) {
            return templates.values().stream()
                    .filter(t -> testType.equals(t.getTestType()) && 
                               version.equals(t.getVersion()) && 
                               Boolean.TRUE.equals(t.getIsActive()))
                    .findFirst();
        }

        @Override
        public boolean existsByTestTypeAndIsActiveTrue(String testType) {
            return templates.values().stream()
                    .anyMatch(t -> testType.equals(t.getTestType()) && Boolean.TRUE.equals(t.getIsActive()));
        }

        // MongoRepository methods (simplified implementations)
        @Override
        public <S extends AssessmentTemplate> S save(S entity) {
            if (entity.getId() == null) {
                entity.setId(UUID.randomUUID().toString());
            }
            templates.put(entity.getId(), entity);
            return entity;
        }

        @Override
        public <S extends AssessmentTemplate> List<S> saveAll(Iterable<S> entities) {
            List<S> result = new ArrayList<>();
            entities.forEach(entity -> result.add(save(entity)));
            return result;
        }

        @Override
        public Optional<AssessmentTemplate> findById(String id) {
            return Optional.ofNullable(templates.get(id));
        }

        @Override
        public boolean existsById(String id) {
            return templates.containsKey(id);
        }

        @Override
        public List<AssessmentTemplate> findAll() {
            return new ArrayList<>(templates.values());
        }

        @Override
        public List<AssessmentTemplate> findAllById(Iterable<String> ids) {
            List<AssessmentTemplate> result = new ArrayList<>();
            ids.forEach(id -> findById(id).ifPresent(result::add));
            return result;
        }

        @Override
        public long count() {
            return templates.size();
        }

        @Override
        public void deleteById(String id) {
            templates.remove(id);
        }

        @Override
        public void delete(AssessmentTemplate entity) {
            templates.remove(entity.getId());
        }

        @Override
        public void deleteAllById(Iterable<? extends String> ids) {
            ids.forEach(templates::remove);
        }

        @Override
        public void deleteAll(Iterable<? extends AssessmentTemplate> entities) {
            entities.forEach(entity -> templates.remove(entity.getId()));
        }

        @Override
        public void deleteAll() {
            templates.clear();
        }

        @Override
        public <S extends AssessmentTemplate> S insert(S entity) {
            return save(entity);
        }

        @Override
        public <S extends AssessmentTemplate> List<S> insert(Iterable<S> entities) {
            return saveAll(entities);
        }

        // Additional MongoRepository methods that need implementation
        @Override
        public List<AssessmentTemplate> findAll(Sort sort) {
            List<AssessmentTemplate> result = new ArrayList<>(templates.values());
            // Basic sorting implementation (simplified)
            return result;
        }

        @Override
        public Page<AssessmentTemplate> findAll(Pageable pageable) {
            List<AssessmentTemplate> all = new ArrayList<>(templates.values());
            int start = (int) pageable.getOffset();
            int end = Math.min(start + pageable.getPageSize(), all.size());
            List<AssessmentTemplate> content = start < all.size() ? all.subList(start, end) : new ArrayList<>();
            return new PageImpl<>(content, pageable, all.size());
        }

        // QueryByExampleExecutor methods
        @Override
        public <S extends AssessmentTemplate> Optional<S> findOne(Example<S> example) {
            return Optional.empty(); // Simplified implementation
        }

        @Override
        public <S extends AssessmentTemplate> List<S> findAll(Example<S> example) {
            return new ArrayList<>(); // Simplified implementation
        }

        @Override
        public <S extends AssessmentTemplate> List<S> findAll(Example<S> example, Sort sort) {
            return new ArrayList<>(); // Simplified implementation
        }

        @Override
        public <S extends AssessmentTemplate> Page<S> findAll(Example<S> example, Pageable pageable) {
            return new PageImpl<>(new ArrayList<>(), pageable, 0); // Simplified implementation
        }

        @Override
        public <S extends AssessmentTemplate> long count(Example<S> example) {
            return 0; // Simplified implementation
        }

        @Override
        public <S extends AssessmentTemplate> boolean exists(Example<S> example) {
            return false; // Simplified implementation
        }

        @Override
        public <S extends AssessmentTemplate, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
            return null; // Simplified implementation
        }
    }
}