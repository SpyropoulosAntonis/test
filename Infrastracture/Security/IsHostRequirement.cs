using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Infrastracture.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    { }

    public class IshostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DataContext _dataContext;

        public IshostRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext dataContext)
        {
            _httpContextAccessor = httpContextAccessor;
            _dataContext = dataContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            if (context.Resource is AuthorizationFilterContext authContext)
            {
                var currentUserName = _httpContextAccessor.HttpContext.User?.Claims?.
                    SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

                //var activityId = Guid.Parse(_httpContextAccessor.HttpContext.Request.RouteValues
                //  .SingleOrDefault(x => x.Key == "id").Value.ToString());

                var activityId = Guid.Parse(authContext.RouteData.Values["id"].ToString()); 

                var activity = _dataContext.Activities.FindAsync(activityId).Result;
                var host = activity.UserActivities.FirstOrDefault(x => x.IsHost == true);

                if (host?.AppUser?.UserName == currentUserName)
                {
                    context.Succeed(requirement);
                }
            }

            return Task.CompletedTask;
        }
    }
}
