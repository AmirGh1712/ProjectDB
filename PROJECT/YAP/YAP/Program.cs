using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using YAP.DataBase;
using YAP.Objects;

namespace YAP
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            //CreateHostBuilder(args).Build().Run();


            //IPlacesDB placesDB = new MyPlacesDB("Server=127.0.0.1;Port=3306;Database=yapschema;User Id=root;Password=yapapp123!;");
            //await foreach (Place p in placesDB.GetPlaces(new Filter(4)))
            //{
            //    Console.WriteLine(p.Name);
            //}

            //IUserDB userDB = new MyUserDB("Server=127.0.0.1;Port=3306;Database=yapschema;User Id=root;Password=yapapp123!;");
            //User trying = new User("mirmir1712", "imthegreatest", "Amir David Gheriani");
            //// await userDB.AddUser(trying);
            ////User amir = await userDB.CheckUser("mirmir1712", "imthegreatest");
            ////User amir = await userDB.CheckUser("mirmr1712", "imthegreatest");
            //bool amtrue = await userDB.CheckUsername("mirmir1712");
            //bool amfalse = await userDB.CheckUsername("mirmr1712");
            //Console.WriteLine("ndjs");

            Review rev = new Review(5, "mirmir1712", "shitty place", 2, new DateTime(2020, 12, 16));
            IReviewsDB reviewsDB = new MyReviewsDB("Server=127.0.0.1;Port=3306;Database=yapschema;User Id=root;Password=yapapp123!;");

            await foreach (Review r in reviewsDB.GetReviewsOnPlace(5))
            {
                Console.WriteLine(r.Date);
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
