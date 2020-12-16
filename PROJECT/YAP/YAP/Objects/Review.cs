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
        public int IdPlaces { get; private set; }

        [Newtonsoft.Json.JsonProperty("username")]
        [JsonPropertyName("username")]
        public string Username { get; private set; }

        [Newtonsoft.Json.JsonProperty("review")]
        [JsonPropertyName("review")]
        public string Text { get; private set; }

        [Newtonsoft.Json.JsonProperty("stars")]
        [JsonPropertyName("stars")]
        public int Stars { get; private set; }

        [Newtonsoft.Json.JsonProperty("date")]
        [JsonPropertyName("date")]
        public DateTime Date { get; private set; }

        public Review(int idp, string uname, string rev, int stars, DateTime date)
        {
            IdPlaces = idp;
            Username = uname;
            Text = rev;
            Stars = stars;
            Date = date;
        }
    }
}
