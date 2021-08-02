using Microsoft.AspNetCore.Mvc;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseAPIController : ControllerBase
    {
        private IMediator _mediator;

        //protected means this gonna be available to all derived classes
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>() ;
    }
}