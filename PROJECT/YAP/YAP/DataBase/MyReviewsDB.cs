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
    public class MyReviewsDB : IReviewsDB
    {
        private readonly string connectionString;

        public MyReviewsDB(IConfiguration configuration)
        {
            // The connection string to the DB
            connectionString = configuration["DefConnectionString"];
        }

        public MyReviewsDB(string tryconn)
        {
            // The connection string to the DB
            connectionString = tryconn;
        }

        public async Task AddReview(Review review)
        {
            // Opening the connection
            using MySqlConnection con = new MySqlConnection(connectionString);
            await con.OpenAsync();
            // The insert command
            using var command = new MySqlCommand(
                "INSERT into reviews (username, idPlaces, review, stars, date) VALUES (@username, @idPlaces, @review, @stars, @date)", con);
            // Insert the parameters
            command.Parameters.AddWithValue("@username", review.Username);
            command.Parameters.AddWithValue("@idPlaces", review.IdPlaces);
            command.Parameters.AddWithValue("@review", review.Text);
            command.Parameters.AddWithValue("@stars", review.Stars);
            command.Parameters.AddWithValue("@date", review.Date.ToString("yyyy-MM-dd"));
            //command.Parameters.AddWithValue("@date", review.Date);
            try
            {
                // Execute
                var res = await command.ExecuteNonQueryAsync();

                // Failed
                if (res == 0)
                    throw new ArgumentException("Did not succeed adding review by " + review.Username + " on place with id " + review.IdPlaces);
            }
            // The id was already there
            catch (Exception)
            {
                throw new ArgumentException("An error occured while adding review. Please try again later.");
            }
        }

        public async IAsyncEnumerable<Tuple<Review, Place>> GetReviewsByUser(string uname)
        {
            // Opening the connection
            using MySqlConnection con = new MySqlConnection(connectionString);
            await con.OpenAsync();
            // Get all from the DB
            using MySqlCommand command = new MySqlCommand("SELECT * FROM reviews JOIN places ON places.idPlaces = reviews.idPlaces " +
                "WHERE username = BINARY @username ORDER BY date DESC", con);
            command.Parameters.AddWithValue("@username", uname);
            using MySqlDataReader rdr = (MySqlDataReader)await command.ExecuteReaderAsync();
            // Get and return the flightplans one by one
            while (await rdr.ReadAsync())
            {
                // Get the object by his fields
                string username = rdr.GetString(0);
                int idPlaces = rdr.GetInt32(1);
                string text = rdr.GetString(2);
                int stars = rdr.GetInt32(3);
                DateTime date = rdr.GetDateTime(4);

                int id = rdr.GetInt32(5);
                string city = rdr.GetString(6);
                string category = rdr.GetString(7);
                string name = rdr.GetString(8);
                string address = rdr.GetString(9);
                string directions = rdr.GetString(10);
                string phone = rdr.GetString(11);
                string url = rdr.GetString(12);
                string hours = rdr.GetString(13);
                float latitude = rdr.GetFloat(14);
                float longitude = rdr.GetFloat(15);
                string description = rdr.GetString(16);

                // Create it
                Review review = new Review(idPlaces, username, text, stars, date);
                Place place = new Place(id, city, category, name, address, directions, phone, url, hours,
                    latitude, longitude, description, 0);

                // Return it
                yield return new Tuple<Review, Place>(review, place);
            }
            yield break; throw new NotImplementedException();
        }

        public async IAsyncEnumerable<Review> GetReviewsOnPlace(int placeid)
        {
            // Opening the connection
            using MySqlConnection con = new MySqlConnection(connectionString);
            await con.OpenAsync();
            // Get all from the DB
            using MySqlCommand command = new MySqlCommand("SELECT * FROM reviews WHERE idPlaces = @placeid ORDER BY date DESC", con);
            command.Parameters.AddWithValue("@placeid", placeid);
            using MySqlDataReader rdr = (MySqlDataReader)await command.ExecuteReaderAsync();
            // Get and return the flightplans one by one
            while (await rdr.ReadAsync())
            {
                // Get the object by his fields
                string username = rdr.GetString(0);
                int idPlaces = rdr.GetInt32(1);
                string text = rdr.GetString(2);
                int stars = rdr.GetInt32(3);
                DateTime date = rdr.GetDateTime(4);

                // Create it
                Review review = new Review(idPlaces, username, text, stars, date);

                // Return it
                yield return review;
            }
            yield break;
        }
    }
}
