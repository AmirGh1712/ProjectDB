using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using MySql.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YAP.Objects;

namespace YAP.DataBase
{
    public class MyUserDB : IUserDB
    {
        private readonly string connectionString;

        public MyUserDB(IConfiguration configuration)
        {
            // The connection string to the DB
            connectionString = configuration["DefConnectionString"];
        }

        public MyUserDB(string tryconn)
        {
            // The connection string to the DB
            connectionString = tryconn;
        }

        public async Task AddUser(User user)
        {
            // Opening the connection
            using MySqlConnection con = new MySqlConnection(connectionString);
            await con.OpenAsync();
            // The insert command
            using var command = new MySqlCommand(
                "INSERT into users (username, password, fullname) VALUES (@username, @password, @fullname)", con);
            // Insert the parameters
            command.Parameters.AddWithValue("@username", user.Username);
            command.Parameters.AddWithValue("@password", user.Password);
            command.Parameters.AddWithValue("@fullname", user.Fullname);
            try
            {
                // Execute
                var res = await command.ExecuteNonQueryAsync();

                // Failed
                if (res == 0)
                    throw new ArgumentException("Did not succeed adding user " + user.Username);
            }
            // The id was already there
            catch (Exception)
            {
                throw new ArgumentException("username already in database.");
            }
        }

        public async Task<User> CheckUser(string uname, string password)
        {
            // Opening the connection
            using MySqlConnection con = new MySqlConnection(connectionString);
            await con.OpenAsync();
            // Get from the DB
            using MySqlCommand command = new MySqlCommand("SELECT * FROM users WHERE username = @username AND password = @password", con);
            command.Parameters.AddWithValue("@username", uname);
            command.Parameters.AddWithValue("@password", password);
            using MySqlDataReader rdr = (MySqlDataReader)await command.ExecuteReaderAsync();
            User user = null;
            if (await rdr.ReadAsync())
            {
                string newusername = rdr.GetString(0);
                string newpassword = rdr.GetString(1);
                string newfullname = rdr.GetString(2);
                user = new User(newusername, newpassword, newfullname);
            }
            return user;
        }

        public async Task<bool> CheckUsername(string uname)
        {
            // Opening the connection
            using MySqlConnection con = new MySqlConnection(connectionString);
            await con.OpenAsync();
            // Get from the DB
            using MySqlCommand command = new MySqlCommand("SELECT * FROM users WHERE username = @username", con);
            command.Parameters.AddWithValue("@username", uname);
            using MySqlDataReader rdr = (MySqlDataReader)await command.ExecuteReaderAsync();
            return rdr.HasRows;
        }

        // error = -2
        public async Task<float> GetAvgCategory(string uname, string category)
        {
            // Opening the connection
            using MySqlConnection con = new MySqlConnection(connectionString);
            await con.OpenAsync();
            // Get from the DB
            using MySqlCommand command = new MySqlCommand("SELECT COALESCE(AVG(stars), -1) FROM reviews JOIN places ON " +
                "places.idPlaces = reviews.idPlaces WHERE username=@username AND category=@category", con);
            command.Parameters.AddWithValue("@username", uname);
            command.Parameters.AddWithValue("@category", category);
            using MySqlDataReader rdr = (MySqlDataReader)await command.ExecuteReaderAsync();
            if (await rdr.ReadAsync())
            {
                return rdr.GetFloat(0);
            }

            return -2;
        }

        public async IAsyncEnumerable<Place> GetRecommendedPlaces(string uname)
        {
            // Opening the connection
            using MySqlConnection con = new MySqlConnection(connectionString);
            await con.OpenAsync();
            // Get all from the DB
            using MySqlCommand command = new MySqlCommand("SELECT *  FROM (SELECT places.idPlaces ,AVG(stars) AS avgstars FROM places INNER JOIN reviews ON places.idPlaces = reviews.idPlaces WHERE category IN (SELECT category FROM (SELECT category, MAX(stars) FROM (SELECT category, COALESCE(AVG(stars),-1) AS stars FROM reviews JOIN places ON places.idPlaces = reviews.idPlaces WHERE username=@username GROUP BY category) AS tbl) AS tbl2) GROUP BY reviews.idPlaces) as tbl3 JOIN places ON tbl3.idPlaces = places.idPlaces WHERE avgstars >= ALL(SELECT AVG(stars) AS avgstars FROM places INNER JOIN reviews ON places.idPlaces = reviews.idPlaces WHERE category IN (SELECT category FROM (SELECT category, MAX(stars) FROM (SELECT category, COALESCE(AVG(stars),-1) AS stars FROM reviews JOIN places ON places.idPlaces = reviews.idPlaces WHERE username=@username GROUP BY category) AS tbl) AS tbl2) GROUP BY reviews.idPlaces)", con);
            command.Parameters.AddWithValue("@username", uname);
            using MySqlDataReader rdr = (MySqlDataReader)await command.ExecuteReaderAsync();
            // Get and return the flightplans one by one
            while (await rdr.ReadAsync())
            {
                // Get the object by his fields
                int id = rdr.GetInt32("idPlaces");
                string city = rdr.GetString("city");
                string category = rdr.GetString("category");
                string name = rdr.GetString("name");
                string address = rdr.GetString("adress");
                string directions = rdr.GetString("directions");
                string phone = rdr.GetString("phone");
                string url = rdr.GetString("url");
                string hours = rdr.GetString("hours");
                float latitude = rdr.GetFloat("latitude");
                float longitude = rdr.GetFloat("longitude");
                string description = rdr.GetString("description");
                float stars = rdr.GetFloat("avgstars");

                // Create it
                Place place = new Place(id, city, category, name, address, directions, phone, url, hours,
                    latitude, longitude, description, stars);

                // Return it
                yield return place;
            }
            yield break;
        }
    }
}
