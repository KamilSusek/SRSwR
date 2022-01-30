package polsl.tai.srswr.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

public class DisabledException extends AbstractThrowableProblem {

    private static final long serialVersionUID = 1L;

    private final String entityName = "user";

    private final String errorKey = "disabled";

    public DisabledException(String defaultMessage) {
        this(ErrorConstants.DEFAULT_TYPE, defaultMessage);
    }

    public DisabledException(URI type, String defaultMessage) {
        super(type, defaultMessage, Status.FORBIDDEN, null, null, null, getAlertParameters());
    }

    public String getEntityName() {
        return entityName;
    }

    public String getErrorKey() {
        return errorKey;
    }

    private static Map<String, Object> getAlertParameters() {
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("message", "error." + "disabled");
        parameters.put("params", "user");
        return parameters;
    }
}
