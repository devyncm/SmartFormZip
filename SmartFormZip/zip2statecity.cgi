#! /usr/bin/perl -w

# zip2state.cgi - print the state where a zip code is
#
# D Provine, 7 March 2022

use strict;
use warnings;

my $targetzip;
# get the zip from the query line; default to Glassboro
my $qs = $ENV{"QUERY_STRING"};
if (defined $qs && $qs ne "") {
    $targetzip = $qs;
} else {
    $targetzip = "08028";
}

my ($line, $zip, $city, $state, $lat, $long, $tz, $has_dst);
my $found = 0;
# get state name
open (ZIPLIST, "./zipcode.csv") || die "Can't open zip list\n";;
while ( !$found && defined($line = <ZIPLIST>) ) {
    chomp($line);
    next if (length($line) == 0);
    $line =~ s/"//g;
    ($zip, $city, $state, $lat, $long, $tz, $has_dst) = split(",", $line);

    next if ($zip eq "zip");

    if ($zip == $targetzip) {
        $found = 1;
    }
}
close(ZIPLIST);

# glassboro is the default
if ($found == 0) {
    $zip = "08028";
    $city = "Glassboro";
    $state = "NJ";
}


# get the name of the state from the abbreviation
my ($statename, $abbr);
# go through list, get all state names
open (NAMELIST, "./state_abbrs.csv") || die "Can't open name list\n";

$found = 0;
while ( !$found && defined($line = <NAMELIST>) ) {
    chomp($line);
    next if (length($line) == 0);
    $line =~ s/"//g;
    ($statename,$abbr) = split(",", $line);

    next if ($statename eq "state"); # skip header line

    if ($abbr eq $state) {
        $found = 1;
    }
}
close (NAMELIST);


# print out information about zip code

print "Content-Type: text/plain\n\n";

printf("%s\n%s\n%s\n", $city, $statename, $zip);
