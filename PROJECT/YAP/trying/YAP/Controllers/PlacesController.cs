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
    public class PlacesController : ControllerBase
    {
        private readonly IPlacesDB placesDB;

        public PlacesController(IPlacesDB placesDB)
        {
            this.placesDB = placesDB;
        }


        [HttpGet]
        public async Task<ActionResult<IList<Place>>> Get(float longitude, float latitude, float radius, int stars = 0, [FromQuery(Name = "cats")] LinkedList<string> cats = null)
        {
            Filter f = new Filter(latitude, longitude, radius);
            f.stars = stars;
            if (cats.Count > 0)
            {
                f.cats = cats;
            }
            //f.cats = new LinkedList<string>(cats);
            
            IList<Place> places = new List<Place>();

            await foreach (Place p in placesDB.GetPlaces(f))
            {
                places.Add(p);
            }

            return Ok(places);
        }

    }
}