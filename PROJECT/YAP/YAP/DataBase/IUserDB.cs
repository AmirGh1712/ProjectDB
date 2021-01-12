using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YAP.Objects;

namespace YAP.DataBase
{
    public interface IUserDB
    {
        /// <summary>
        /// Insert a new user to the DB.
        /// </summary>
        /// <param name="user">The user.</param>
        /// <returns>None.</returns>
        public Task AddUser(User user);
        /// <summary>
        /// Returns if the username already exists in theDB.
        /// </summary>
        /// <param name="uname">The username.</param>
        /// <returns>Boolean.</returns>
        public Task<Boolean> CheckUsername(string uname);
        /// <summary>
        /// Returns if the password matches the username.
        /// </summary>
        /// <param name="uname">The username.</param>
        /// <param name="password">The password.</param>
        /// <returns>The user data.</returns>
        public Task<User> CheckUser(string uname, string password);
        /// <summary>
        /// Returns the user's average rating on places of the given category.
        /// </summary>
        /// <param name="uname">The username</param>
        /// <param name="category">The category</param>
        /// <returns>The average.</returns>
        public Task<float> GetAvgCategory(string uname, string category);
        /// <summary>
        /// Returns the recommended places for the user.
        /// </summary>
        /// <param name="uname">The username.</param>
        /// <returns>List of places.</returns>
        public IAsyncEnumerable<Place> GetRecommendedPlaces(string uname);
    }
}
