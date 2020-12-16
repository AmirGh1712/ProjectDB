using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace YAP.Objects
{
    public class User
    {
        [Newtonsoft.Json.JsonProperty("username")]
        [JsonPropertyName("username")]
        public string Username { get; private set; }

        [Newtonsoft.Json.JsonProperty("password")]
        [JsonPropertyName("password")]
        public string Password { get; private set; }

        [Newtonsoft.Json.JsonProperty("fullname")]
        [JsonPropertyName("fullname")]
        public string Fullname { get; private set; }

        public User(string uname, string password, string fullname)
        {
            Username = uname;
            Password = password;
            Fullname = fullname;
        }
    }
}
