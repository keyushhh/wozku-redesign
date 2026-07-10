## ----include = FALSE----------------------------------------------------------
knitr::opts_chunk$set(
  collapse = TRUE,
  dpi = 200,
  comment = "#>"
)

## -----------------------------------------------------------------------------
#  install.packages("mapindia")

## -----------------------------------------------------------------------------
#  # install.packages("pak")
#  pak::pak("shubhamdutta26/mapindia")

## ----states-dist--------------------------------------------------------------
library(mapindia)
library(ggplot2)
library(patchwork)

states <- plot_india("states") +
  geom_sf(fill= "antiquewhite") +
  theme(panel.grid.major = 
          element_line(color = gray(.5), linetype = "dashed", linewidth = 0.2), 
        panel.background = element_rect(fill = "aliceblue"))

districts <- plot_india("districts") +
  geom_sf(fill= "gray") +
  theme(panel.grid.major = 
          element_line(color = gray(.5), linetype = "dashed", linewidth = 0.2), 
        panel.background = element_rect(fill = "aliceblue"))

states + districts

## ----zones, warning=FALSE-----------------------------------------------------
central <- plot_india("states", include = .central, exclude = "UK", labels = TRUE) +
  geom_sf(fill= "antiquewhite")

east <- plot_india("states", include = .east, labels = FALSE)

central + east

## ----states, warning=FALSE----------------------------------------------------
mh <- plot_india("districts", include = "MH")

tn <- plot_india("state", include = "Tamil Nadu", labels = FALSE)

mh + tn

## ----data, warning=FALSE------------------------------------------------------
statepop2011 <- plot_india("states", data = statepop, values = "pop_2011") +
  scale_fill_continuous(low = "blue", high = "yellow", guide = "none")

wbpop2011 <- plot_india("districts", data = wb_2011, values = "pop_2011", include = "WB") +
  scale_fill_continuous(low = "green", high = "red", guide = "none")

statepop2011 + wbpop2011

