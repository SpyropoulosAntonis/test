using System.Threading.Tasks;
using Application.User;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    
    public class UserController : baseController
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Query query)
        {
            return await Mediator.Send(query);
        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }
        
        [HttpGet]
        public async Task<ActionResult<User>> CurrentUser() //CurrentUser.Query query Αν το βάλω έτσι τότε κάνει έλεγχο και θέλει να έχει CONTENT-TYPE KAI CONTENT-LENGTH
        {
            return await Mediator.Send(new CurrentUser.Query());
        }


    }
}
