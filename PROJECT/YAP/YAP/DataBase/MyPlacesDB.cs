using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YAP.Objects;
using MySql.Data;
using MySql.Data.MySqlClient;
using System.Security.Cryptography;

namespace YAP.DataBase
{
    public class MyPlacesDB : IPlacesDB
    {
        private readonly string connectionString;

        public MyPlacesDB(IConfiguration configuration)
        {
            // The connection string to the DB
            connectionString = configuration["DefConnectionString"];
        }

        public MyPlacesDB(string tryconn)
        {
            // The connection string to the DB
            connectionString = tryconn;
        }

        public async IAsyncEnumerable<Place> GetPlaces(Filter filter)
        {
            // Opening the connection
            using MySqlConnection con = new MySqlConnection(connectionString);
            await con.OpenAsync();
            // Get all from the DB
            using MySqlCommand command = new MySqlCommand(filter.CreateCommand(), con);
            using MySqlDataReader rdr = (MySqlDataReader)await command.ExecuteReaderAsync();
            // Get and return the flightplans one by one
            while (await rdr.ReadAsync())
            {
                // Get the object by his fields
                int id = rdr.GetInt32(0);
                string city = rdr.GetString(1);
                string category = rdr.GetString(2);
                string name = rdr.GetString(3);
                string address = rdr.GetString(4);
                string directions = rdr.GetString(5);
                string phone = rdr.GetString(6);
                string url = rdr.GetString(7);
                string hours = rdr.GetString(8);
                float latitude = rdr.GetFloat(9);
                float longitude = rdr.GetFloat(10);
                string description = rdr.GetString(11);

                // Create it
                Place place = new Place(id, city, category, name, address, directions, phone, url, hours,
                    latitude, longitude, description);

                // Return it
                yield return place;
            }
            yield break;
        }
    }
}
