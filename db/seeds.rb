(1..100).each do
  Customer.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    quote: Faker::TvShows::Seinfeld.quote
  )
end
