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
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewsDB reviewsDB;

        public ReviewsController(IReviewsDB reviewsDB)
        {
            this.reviewsDB = reviewsDB;
        }

        [HttpGet]
        public async Task<ActionResult<IList<Review>>> Get(int id)
        {
            IList<Review> reviews = new List<Review>();

            await foreach (Review r in reviewsDB.GetReviewsOnPlace(id))
            {
                reviews.Add(r);
            }

            return Ok(reviews);
        }

        [Route("user")]
        [HttpGet]
        public async Task<ActionResult<IList<Review>>> Get(string uname)
        {
            IList<Review> reviews = new List<Review>();

            await foreach (Review r in reviewsDB.GetReviewsByUser(uname))
            {
                reviews.Add(r);
            }

            return Ok(reviews);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Review review)
        //public async Task<IActionResult> Post([FromBody] string h)
        {
            //return Ok();
            try
            {
                //check if all fields got are not null
                bool isOk = review.GetType().GetProperties().All(p => p.GetValue(review) != null);
                if (isOk)
                {
                    await reviewsDB.AddReview(review);
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