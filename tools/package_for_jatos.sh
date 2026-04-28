#!/usr/bin/env bash

# Create timestamp
TS=$(date +"%Y%m%d-%H%M%S")

# Output directory
OUTDIR="../packaged"
mkdir -p "$OUTDIR"

# Create temp directory
TMPDIR=$(mktemp -d -t experiment_XXXXXX)

echo "Temp directory: $TMPDIR"

# Create folder structure
mkdir -p "$TMPDIR/ffk/stimuli"
mkdir -p "$TMPDIR/ffk/core"
mkdir -p "$TMPDIR/ffk/css"

# Copy main file
cp ../misc/ffk.jas "$TMPDIR/"

# Copy required files
cp ../start-experiment.html "$TMPDIR/ffk/"
cp ../config.js "$TMPDIR/ffk/"

# Optional files
[ -f ../consent.pdf ] && cp ../consent.pdf "$TMPDIR/ffk/"
[ -f ../instructions.pdf ] && cp ../instructions.pdf "$TMPDIR/ffk/"

# Copy directories
cp -r ../stimuli/* "$TMPDIR/ffk/stimuli/" 2>/dev/null
cp -r ../core/* "$TMPDIR/ffk/core/" 2>/dev/null
cp -r ../css/* "$TMPDIR/ffk/css/" 2>/dev/null

# Create archive in packaged folder
ZIPNAME="ffk-$TS.jzip"
cd "$TMPDIR" || exit
zip -r "$OLDPWD/$OUTDIR/$ZIPNAME" . > /dev/null

echo "Done!"
echo "Archive created: $OLDPWD/$OUTDIR/$ZIPNAME"

# Cleanup
rm -rf "$TMPDIR"
