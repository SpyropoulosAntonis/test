using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Update.Internal;

namespace API.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class ActivitiesController : baseController//ControllerBase
    {
       // private readonly IMediator _mediator;

      /*  public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }
      */
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid ID)
        {
            return await Mediator.Send(new Details.Query { Id = ID });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Edit.Command command, Guid id)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            //command.Id = id;
            return await Mediator.Send(new Delete.Command {Id=id });
        }

    }
}
