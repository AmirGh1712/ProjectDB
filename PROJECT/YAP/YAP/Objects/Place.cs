using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace YAP.Objects
{
    public class Place
    {
        [Newtonsoft.Json.JsonProperty("id")]
        [JsonPropertyName("id")]
        public int Id { get; private set;}

        [Newtonsoft.Json.JsonProperty("longitude")]
        [JsonPropertyName("longitude")]
        public float Longitude { get; private set; }

        [Newtonsoft.Json.JsonProperty("latitude")]
        [JsonPropertyName("latitude")]
        public float Latitude { get; private set; }

        [Newtonsoft.Json.JsonProperty("name")]
        [JsonPropertyName("name")]
        public string Name { get; private set; }

        [Newtonsoft.Json.JsonProperty("city")]
        [JsonPropertyName("city")]
        public string City { get; private set; }

        [Newtonsoft.Json.JsonProperty("category")]
        [JsonPropertyName("category")]
        public string Category { get; private set; }

        [Newtonsoft.Json.JsonProperty("address")]
        [JsonPropertyName("address")]
        public string Address { get; private set; }

        [Newtonsoft.Json.JsonProperty("phone")]
        [JsonPropertyName("phone")]
        public string Phone { get; private set; }

        [Newtonsoft.Json.JsonProperty("url")]
        [JsonPropertyName("url")]
        public string Url { get; private set; }

        [Newtonsoft.Json.JsonProperty("description")]
        [JsonPropertyName("description")]
        public string Description { get; private set; }

        [Newtonsoft.Json.JsonProperty("hours")]
        [JsonPropertyName("hours")]
        public string Hours { get; private set; }

        [Newtonsoft.Json.JsonProperty("directions")]
        [JsonPropertyName("directions")]
        public string Directions { get; private set; }





        ///// <summary>
        ///// A constructor.
        ///// </summary>
        ///// <param name="passengers"> The number of passengers on the flight. </param>
        ///// <param name="company"> The name of the company managing the flight. </param>
        ///// <param name="initialLocation"> The initial location / where the flight
        ///// takes off. </param>
        ///// <param name="segments"> A list of locations where the flight is passing. </param>
        //[JsonConstructor]
        //public FlightPlan(int passengers, string company, InitialLocation initialLocation,
        //    IList<FlightStatus> segments)
        //{
        //    this.id = idGenerator.GenerateID();
        //    Passengers = passengers;
        //    Company = company;
        //    InitLocation = initialLocation;
        //    Segments = segments;
        //}


        ///// <summary>
        ///// Create a flight plan using the database representation of a flight plan.
        ///// </summary>
        ///// <param name="fp"> The database representation of a flight plan. </param>
        //public FlightPlan(FlightPlanDBRep dataBaseRepresentation)
        //{
        //    Passengers = dataBaseRepresentation.Passengers;
        //    id = dataBaseRepresentation.GetID();
        //    Company = dataBaseRepresentation.Company;
        //    InitLocation = JsonConvert.DeserializeObject<InitialLocation>(
        //        dataBaseRepresentation.InitLocation
        //        );
        //    Segments = JsonConvert.DeserializeObject<IList<FlightStatus>>(dataBaseRepresentation.Segments);
        //}


        /// <summary>
        /// A default constructor.
        /// </summary>
        public Place(int idp, string city, string cat, string name, string addr, string direc, string phone,
            string url, string hours, float lati, float longi, string desc)
        {
            Id = idp;
            City = city;
            Category = cat;
            Name = name;
            Address = addr;
            Directions = direc;
            Phone = phone;
            Url = url;
            Hours = hours;
            Latitude = lati;
            Longitude = longi;
            Description = desc;
        }
    }
}
