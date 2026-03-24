
'use client';

export default function ReviewModal({ isOpen, onClose, reviews = [] }) {
  if (!isOpen) return null;

  const StarRating = ({ rating }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <i 
            key={star}
            className={`ri-star-${star <= rating ? 'fill' : 'line'} w-4 h-4 flex items-center justify-center ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const defaultReviews = [
    {
      id: 1,
      text: "Amazing Black Friday deals! The quality is outstanding and delivery was super fast.",
      rating: 5,
      name: "Sarah Johnson",
      title: "Fashion Enthusiast",
      avatar: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20woman%20with%20modern%20hairstyle%2C%20clean%20background%2C%20friendly%20expression%2C%20business%20casual%20attire&width=100&height=100&seq=avatar-sarah&orientation=squarish"
    },
    {
      id: 2,
      text: "Best shopping experience ever! The discounts are real and the products are exactly as described.",
      rating: 5,
      name: "Michael Chen",
      title: "Regular Customer",
      avatar: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20man%20with%20glasses%2C%20clean%20background%2C%20confident%20smile%2C%20business%20casual%20attire&width=100&height=100&seq=avatar-michael&orientation=squarish"
    },
    {
      id: 3,
      text: "I saved so much money during this Black Friday sale. Highly recommend this store!",
      rating: 5,
      name: "Emma Davis",
      title: "Style Blogger",
      avatar: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20stylish%20woman%20with%20trendy%20outfit%2C%20clean%20background%2C%20creative%20expression%2C%20fashion%20forward%20style&width=100&height=100&seq=avatar-emma&orientation=squarish"
    },
    {
      id: 4,
      text: "Premium quality at unbeatable prices. This is my go-to store for luxury fashion.",
      rating: 5,
      name: "James Wilson",
      title: "Fashion Designer",
      avatar: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20creative%20man%20with%20designer%20aesthetic%2C%20clean%20background%2C%20artistic%20expression%2C%20modern%20style&width=100&height=100&seq=avatar-james&orientation=squarish"
    },
    {
      id: 5,
      text: "The customer service is exceptional and the product quality exceeded my expectations.",
      rating: 5,
      name: "Lisa Anderson",
      title: "Luxury Shopper",
      avatar: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20elegant%20woman%20with%20luxury%20style%2C%20clean%20background%2C%20sophisticated%20expression%2C%20premium%20fashion%20sense&width=100&height=100&seq=avatar-lisa&orientation=squarish"
    },
    {
      id: 6,
      text: "Fast delivery and authentic products. This Black Friday sale is the best I've seen!",
      rating: 5,
      name: "David Kim",
      title: "Tech Professional",
      avatar: "https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20young%20professional%20man%20with%20modern%20style%2C%20clean%20background%2C%20tech%20industry%20aesthetic%2C%20confident%20look&width=100&height=100&seq=avatar-david&orientation=squarish"
    }
  ];

  const reviewsToShow = reviews && reviews.length > 0 ? reviews : defaultReviews;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h3 className="text-2xl font-bold">Customer Reviews</h3>
          <button 
            onClick={onClose}
            className="bg-gray-100 rounded-full p-2 hover:bg-gray-200 cursor-pointer"
          >
            <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {reviewsToShow.map(review => (
            <div key={review.id} className="border-b pb-6 last:border-b-0">
              <div className="flex items-start space-x-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h5 className="font-bold">{review.name}</h5>
                      <p className="text-sm text-gray-600">{review.title}</p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-gray-700">"{review.text}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
