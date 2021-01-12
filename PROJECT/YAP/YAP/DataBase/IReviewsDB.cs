using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YAP.Objects;

namespace YAP.DataBase
{
    public interface IReviewsDB
    {
        /// <summary>
        /// Inserts a review to the DB.
        /// </summary>
        /// <param name="review">The review.</param>
        /// <returns>None.</returns>
        public Task AddReview(Review review);
        /// <summary>
        /// Returns all the reviews of the place from the DB.
        /// </summary>
        /// <param name="placeid">The id of the place.</param>
        /// <returns>List of reviews.</returns>
        public IAsyncEnumerable<Review> GetReviewsOnPlace(int placeid);
        /// <summary>
        /// Returns all the reviews that was posted by the user.
        /// </summary>
        /// <param name="username">The user's username.</param>
        /// <returns>List of tuples of reviews and the place they were written on.</returns>
        public IAsyncEnumerable<Tuple<Review, Place>> GetReviewsByUser(string username);
    }
}
