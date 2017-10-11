library(RProtoBuf)
library(RSQLite)

readProtoFiles(dir = "~/Documents/uni/TransitNetworkModel/proto")

dat <- read(transit_realtime.FeedMessage,
            "~/Dropbox/gtfs/vehicle_locations.pb")$entity
dat.df <- do.call(rbind, lapply(dat, function(x) {
    data.frame(id = x$vehicle$vehicle$id,
               lat = x$vehicle$position$latitude,
               lng = x$vehicle$position$longitude,
               route = x$vehicle$trip$route_id)
}))
write.csv(dat.df, "../data/vehicles.csv", quote = FALSE, row.names = FALSE)
