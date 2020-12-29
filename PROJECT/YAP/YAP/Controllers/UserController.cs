using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using YAP.DataBase;
using YAP.Objects;

namespace YAP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserDB userDB;

        public UserController(IUserDB userDB)
        {
            this.userDB = userDB;
        }

        [HttpGet]
        public async Task<ActionResult<User>> Get(string username, string password)
        {
            User user = await userDB.CheckUser(username, password);

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User user)
        //public async Task<IActionResult> Post([FromBody] string h)
        {
            //return Ok();
            try
            {
                //check if all fields got are not null
                bool isOk = user.GetType().GetProperties().All(p => p.GetValue(user) != null);
                if (isOk)
                {
                    bool unameExists = await userDB.CheckUsername(user.Username);
                    if (unameExists)
                    {
                        return BadRequest("username already exists in the system");
                    }
                    await userDB.AddUser(user);
                    return Ok();
                }

                return BadRequest("Property can't be null");
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}