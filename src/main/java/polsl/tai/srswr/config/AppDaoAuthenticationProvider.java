package polsl.tai.srswr.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import polsl.tai.srswr.domain.User;
import polsl.tai.srswr.repository.UserRepository;
import polsl.tai.srswr.web.rest.errors.CustomAuthenticationException;
import polsl.tai.srswr.web.rest.errors.DisabledException;

import javax.annotation.PostConstruct;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AppDaoAuthenticationProvider extends DaoAuthenticationProvider {


    private static final Integer MAX_FAILED_ATTEMPTS = 5;
    @Autowired
    private UserRepository userRepository;
    private final UserDetailsService userDetailsService;

    @PostConstruct
    protected void postConstruct() {
        super.setUserDetailsService(userDetailsService);
    }


    public void handleFailedLogin(String login) {
        Optional<User> optionalUser = userRepository.findOneByLogin(login);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            Integer failedLoginAttempts = user.getFailedLoginAttempts();
            failedLoginAttempts++;
            user.setFailedLoginAttempts(failedLoginAttempts);
            if (failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
                user.setDisabled(true);
            }
            userRepository.save(user);
        }
    }

    public void resetFailedLoginAttempts(String login) {
        User user = userRepository.findOneByLogin(login).orElseThrow(InternalError::new);
        user.setFailedLoginAttempts(0);
        userRepository.save(user);
    }

    @Override
    @Transactional
    protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
        Optional<User> optionalUser = userRepository.findOneByLogin(userDetails.getUsername());
        if(!optionalUser.isPresent()){
            throw new DisabledException("");
        }
        User user = optionalUser.get();

        if(user.isDisabled()) {
            throw new DisabledException("");
        }
        if (authentication.getCredentials() == null) {
            handleFailedLogin(userDetails.getUsername());
            throw customAuthenticationException();
        }

        boolean passwordMatches = super.getPasswordEncoder().matches(authentication.getCredentials().toString(),
            userDetails.getPassword());
        if (!passwordMatches) {
            handleFailedLogin(userDetails.getUsername());
            throw customAuthenticationException();
        }
    }

    @Override
    @Transactional
    protected Authentication createSuccessAuthentication(Object principal, Authentication authentication, UserDetails user) {
        resetFailedLoginAttempts(user.getUsername());
        return super.createSuccessAuthentication(principal, authentication, user);
    }

    private CustomAuthenticationException customAuthenticationException() {
        return new CustomAuthenticationException("");
    }

}
