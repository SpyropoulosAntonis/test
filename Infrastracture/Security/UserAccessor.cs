using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Infrastracture.Security
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContectAccessor;

        public UserAccessor(IHttpContextAccessor httpContectAccessor)
        {
            _httpContectAccessor = httpContectAccessor;
        }

        public string GetCurrentUsername()
        {

            Console.WriteLine(_httpContectAccessor.HttpContext.User?.Claims?.FirstOrDefault(x =>
          x.Type == ClaimTypes.NameIdentifier)?.Value);
            return _httpContectAccessor.HttpContext.User?.Claims?.FirstOrDefault(x =>
            x.Type == ClaimTypes.NameIdentifier)?.Value;
          
        }
    }
}
