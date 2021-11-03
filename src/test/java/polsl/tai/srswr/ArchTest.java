package polsl.tai.srswr;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("polsl.tai.srswr");

        noClasses()
            .that()
                .resideInAnyPackage("polsl.tai.srswr.service..")
            .or()
                .resideInAnyPackage("polsl.tai.srswr.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..polsl.tai.srswr.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
