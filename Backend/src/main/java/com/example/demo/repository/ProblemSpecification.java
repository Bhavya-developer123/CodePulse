package com.example.demo.repository;
import com.example.demo.Entity.Problem;
import org.springframework.data.jpa.domain.Specification;
public class ProblemSpecification {
    public static Specification<Problem> filterProblems(
            String title,
            String difficulty,
            String topic,
            String platform) {
        return (root, query, criteriaBuilder) -> {
            var predicates = criteriaBuilder.conjunction();
            if (title != null && !title.isBlank()) {
                predicates = criteriaBuilder.and(
                        predicates,
                        criteriaBuilder.like(
                                criteriaBuilder.lower(
                                        root.get("title")
                                ),
                                "%" + title.toLowerCase() + "%"
                        )
                );
            }
            if (difficulty != null && !difficulty.isBlank()) {
                predicates = criteriaBuilder.and(
                        predicates,
                        criteriaBuilder.equal(
                                criteriaBuilder.lower(
                                        root.get("difficulty")
                                ),
                                difficulty.toLowerCase()
                        )
                );
            }
            if (topic != null && !topic.isBlank()) {
                predicates = criteriaBuilder.and(
                        predicates,
                        criteriaBuilder.equal(
                                criteriaBuilder.lower(
                                        root.get("topic")
                                ),
                                topic.toLowerCase()
                        )
                );
            }
            if (platform != null && !platform.isBlank()) {
                predicates = criteriaBuilder.and(
                        predicates,
                        criteriaBuilder.equal(
                                criteriaBuilder.lower(
                                        root.get("platform")
                                ),
                                platform.toLowerCase()
                        )
                );
            }
            return predicates;
        };
    }
}
