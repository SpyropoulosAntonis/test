using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Domain
{
    public class AppUsers : IdentityUser
    {
        public string DisplayName { get; set; }

        public virtual ICollection<UserActivity> UserActivities { get; set; }
    }
}
