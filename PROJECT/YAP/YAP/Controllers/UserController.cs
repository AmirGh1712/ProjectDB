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

        [Route("check")]
        [HttpPost]
        public async Task<ActionResult<User>> PostCheck([FromBody] User u)
        {
            User user = await userDB.CheckUser(u.Username, u.Password);

            return Ok(user);
        }

        [HttpGet]
        public async Task<ActionResult<User>> Get(string username, string category)
        {
            float avg = await userDB.GetAvgCategory(username, category);
           
            if (avg == -2)
            {
                return BadRequest("An error occured while taking this users data");
            }

            return Ok(avg);
        }

        [Route("recommendation")]
        [HttpGet]
        public async Task<ActionResult<User>> GetRecommendation(string username)
        {

            IList<Place> places = new List<Place>();

            await foreach (Place p in userDB.GetRecommendedPlaces(username))
            {
                places.Add(p);
            }

            return Ok(places);
        }

        [HttpPost]
        public async Task<ActionResult<bool>> Post([FromBody] User user)
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
                    return Ok(true);
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