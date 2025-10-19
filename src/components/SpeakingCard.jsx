export default function SpeakingCard({ 
  eventName, 
  eventLogo = null,
  date, 
  location, 
  status = 'upcoming',
  description = '',
  link = null
}) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const statusColors = {
    upcoming: 'bg-green-100 text-green-800',
    past: 'bg-slate-100 text-slate-800',
    confirmed: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
        {/* Event Logo */}
        {eventLogo && (
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
              <img 
                src={eventLogo} 
                alt={eventName}
                className="w-full h-full object-contain p-2"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          {/* Status Badge */}
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>

          {/* Event Name */}
          <h3 className="text-xl font-heading font-bold mb-2 text-slate-900">
            {eventName}
          </h3>

          {/* Date & Location */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-slate-600 mb-3">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{location}</span>
            </div>
          </div>

          {/* Description */}
          {description && (
            <p className="text-slate-600 mb-4">
              {description}
            </p>
          )}

          {/* Link */}
          {link && (
            <a 
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              Learn more →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
