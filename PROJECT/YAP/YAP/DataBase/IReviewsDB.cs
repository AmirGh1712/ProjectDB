using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YAP.Objects;

namespace YAP.DataBase
{
    public interface IReviewsDB
    {
        public Task AddReview(Review review);

        public IAsyncEnumerable<Review> GetReviewsOnPlace(int placeid);
        public IAsyncEnumerable<Tuple<Review, Place>> GetReviewsByUser(string username);
    }
}
