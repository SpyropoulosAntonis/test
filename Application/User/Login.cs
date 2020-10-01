using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;

namespace Application.User
{
    public class Login
    {

        public class Query : IRequest<User>
        {
            //Εισαγωγή Properties αν θέλω να κάνω επιλογή βάση αυτών
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUsers> _usermanager;
            private readonly SignInManager<AppUsers> _signInManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(UserManager<AppUsers> usermanager, SignInManager<AppUsers> signInManager,IJwtGenerator jwtGenerator)
            {
                _usermanager = usermanager;
                _signInManager = signInManager;
                _jwtGenerator = jwtGenerator;
            }
            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _usermanager.FindByEmailAsync(request.Email);

                if (user == null)
                    throw new RestException(HttpStatusCode.Unauthorized);

                var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

                if(result.Succeeded)
                {
                    //TODO : Generate token 
                    return new User
                    {
                        Username = user.UserName,
                        DisplayName = user.DisplayName,
                        Image = null,
                        Token = _jwtGenerator.CreateToken(user)
                                    
                    };
                }

                throw new RestException(HttpStatusCode.Unauthorized);
            }
        }
    }
}
