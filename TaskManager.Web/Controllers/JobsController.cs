using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Data;
using TaskManager.Web.ViewModels;

namespace TaskManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobsController : ControllerBase
    {
        private readonly string _connectionString;
        public JobsController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpGet("getall")]
        public List<Job> GetAll()
        {
            var repo = new JobRepository(_connectionString);
            return repo.GetAll();
        }
        [HttpPost("add")]
        public void Add(AddJobViewModel vm)
        {
            var repo = new JobRepository(_connectionString);
            repo.Add(vm.Title, vm.UserId);
        }
    }
}
