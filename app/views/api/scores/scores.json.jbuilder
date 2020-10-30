res = []
@scores.each do |score|
   res.push(score)
end

json.scores res
