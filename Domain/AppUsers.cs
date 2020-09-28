using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUsers : IdentityUser
    {
        public string DisplayName { get; set; }
    }
}
