package <%=packageName%>.web.rest;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fhlbny.security.AuthenticateUserDTO;
import com.fhlbny.security.AuthenticateUserService;
import <%=packageName%>.security.SecurityUtils;

@RestController
@RequestMapping(value = "/auth")
public class AuthenticateUserResource {
    
    private AuthenticateUserService authenticateUserService;

    @Autowired
    public AuthenticateUserResource(AuthenticateUserService authenticateUserService) {
        this.authenticateUserService = authenticateUserService;
    }

    /**
     * This method will return the list of allowed modules for a specific
     * role,token,role and full name of a logged in user
     * 
     * @return
     * @throws ParseException
     */
    @RequestMapping(
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @ResponseBody
    public AuthenticateUserDTO authenticatedUser() throws ParseException {
        return authenticateUserService
                .getAuthentication(SecurityUtils.getCurrentUserLogin().get(), SecurityUtils.userRoles());
    }

}