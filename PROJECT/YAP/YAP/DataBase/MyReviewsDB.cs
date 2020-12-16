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
