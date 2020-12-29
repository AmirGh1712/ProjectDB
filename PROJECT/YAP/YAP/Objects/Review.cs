using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace YAP.Objects
{
    public class Review
    {
        [Newtonsoft.Json.JsonProperty("idPlaces")]
        [JsonPropertyName("idPlaces")]
        public int IdPlaces { get; set; }

        [Newtonsoft.Json.JsonProperty("username")]
        [JsonPropertyName("username")]
        public string Username { get; set; }

        [Newtonsoft.Json.JsonProperty("review")]
        [JsonPropertyName("review")]
        public string Text { get; set; }

        [Newtonsoft.Json.JsonProperty("stars")]
        [JsonPropertyName("stars")]
        public int Stars { get; set; }

        [Newtonsoft.Json.JsonProperty("date")]
        [JsonPropertyName("date")]
        public DateTime Date { get; set; }

        //public Review(int idp, string uname, string rev, int stars, DateTime date)
        //{
        //    IdPlaces = idp;
        //    Username = uname;
        //    Text = rev;
        //    Stars = stars;
        //    this.Date = date;
        //}

        //[JsonConstructor]
        public Review(int idPlaces, string username, string review, int stars, DateTime date)
        {
            IdPlaces = idPlaces;
            Username = username;
            Text = review;
            Stars = stars;
            Date = date;
        }

        public Review()
        {
            Date = DateTime.UtcNow;
        }
    }
}
