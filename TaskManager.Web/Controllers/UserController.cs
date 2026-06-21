using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskManager.Data;
using TaskManager.Web.ViewModels;

namespace TaskManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly string _connectionString;
        public UserController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpPost("signup")]
        public void Signup(SignupViewModel vm)
        {
            var repo = new UserRepository(_connectionString);
            repo.AddUser(vm, vm.Password);
        }
        [HttpGet("getcurrentuser")]
        public User GetCurrentUser()
        {
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }

            var repo = new UserRepository(_connectionString);
            return repo.GetByEmail(User.Identity.Name);
        }
        [HttpPost("login")]
        public User Login(LoginViewModel vm)
        {
            var repo = new UserRepository(_connectionString);
            var user = repo.Login(vm.Email, vm.Password);
            if (user == null)
            {
                return null;
            }

            var claims = new List<Claim>
            {
                new Claim("user", vm.Email)
            };
            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", "user", "role"))).Wait();
            return user;
        }
    }
}
