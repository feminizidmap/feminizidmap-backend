#!/bin/bash

# Function to display help information
display_help() {
    echo "Feminizidmap Case Export Script"
    echo "==============================="
    echo
    echo "Description:"
    echo "  This script exports case data from the Feminizidmap Strapi backend to CSV format."
    echo
    echo "Usage:"
    echo "  STRAPI_API_TOKEN=\"<YOUR_TOKEN>\" $0 [options]"
    echo
    echo "Options:"
    echo "  --start-date <date>    Filter cases with crime_date on or after this date (YYYY-MM-DD)"
    echo "  --end-date <date>      Filter cases with crime_date on or before this date (YYYY-MM-DD)"
    echo "  --output-file <file>   Specify the output filename"
    echo "                         Default: feminizidmap-cases-export-YYYY-MM-DD_HH-MM-SS.csv"
    echo "  --api-url <url>        The base URL of the Strapi API"
    echo "                         Default: http://localhost:1337"
    echo "  --include-drafts       Include draft (unpublished) cases in the export"
    echo "  --help                 Display this help message and exit"
    echo
    echo "Environment Variables:"
    echo "  STRAPI_API_TOKEN       Required: Your Strapi authentication token"
    echo "  STRAPI_URL             Optional: The base URL of your Strapi instance"
    echo "                         (can be overridden with --api-url)"
    echo
    echo "Examples:"
    echo "  # Export all published cases"
    echo "  STRAPI_API_TOKEN=\"<YOUR_TOKEN>\" $0"
    echo
    echo "  # Export cases from 2019"
    echo "  STRAPI_API_TOKEN=\"<YOUR_TOKEN>\" $0 --start-date \"2019-01-01\" --end-date \"2019-12-31\""
    echo
    echo "  # Export all cases including drafts"
    echo "  STRAPI_API_TOKEN=\"<YOUR_TOKEN>\" $0 --include-drafts"
    echo
    exit 0
}

# Default values
START_DATE=""
END_DATE=""
# Default output file with timestamp will be set later
OUTPUT_FILE=""
API_URL=${STRAPI_URL:-"http://localhost:1337"}
INCLUDE_DRAFTS=false

# Parse named arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --help)
      display_help
      ;;
    --start-date)
      START_DATE="$2"
      shift 2
      ;;
    --end-date)
      END_DATE="$2"
      shift 2
      ;;
    --output-file)
      OUTPUT_FILE="$2"
      shift 2
      ;;
    --api-url)
      API_URL="$2"
      shift 2
      ;;
    --include-drafts)
      INCLUDE_DRAFTS=true
      shift 1
      ;;
    *)
      echo "Unknown parameter: $1"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

# If no output file is specified, create a default name with timestamp
if [ -z "$OUTPUT_FILE" ]; then
    TIMESTAMP=$(date "+%Y-%m-%d_%H-%M-%S")
    OUTPUT_FILE="feminizidmap-cases-export-${TIMESTAMP}.csv"
    echo "No output file specified. Using default: $OUTPUT_FILE"
fi

# Check if STRAPI_API_TOKEN is set
if [ -z "$STRAPI_API_TOKEN" ]; then
    echo "Error: STRAPI_API_TOKEN environment variable is not set."
    echo "Please set it first: export STRAPI_API_TOKEN=your_token_here"
    echo "For more information, use --help"
    exit 1
fi

# Build the filter query dynamically
FILTER_QUERY=""
if [ -n "$START_DATE" ]; then
    FILTER_QUERY="filters\[crime_date\]\[\$gte\]=$START_DATE"
    echo "Filtering cases from $START_DATE"
fi

if [ -n "$END_DATE" ]; then
    if [ -n "$FILTER_QUERY" ]; then
        FILTER_QUERY="$FILTER_QUERY&filters\[crime_date\]\[\$lte\]=$END_DATE"
    else
        FILTER_QUERY="filters\[crime_date\]\[\$lte\]=$END_DATE"
    fi
    echo "Filtering cases until $END_DATE"
fi

# Add publication state parameter if --include-drafts is set
if [ "$INCLUDE_DRAFTS" = true ]; then
    if [ -n "$FILTER_QUERY" ]; then
        FILTER_QUERY="$FILTER_QUERY&publicationState=preview"
    else
        FILTER_QUERY="publicationState=preview"
    fi
    echo "Including draft (unpublished) cases"
fi

# Only add the question mark if we have filters
if [ -n "$FILTER_QUERY" ]; then
    FILTER_QUERY="?$FILTER_QUERY"
fi

if [ -z "$FILTER_QUERY" ]; then
    echo "Exporting all published cases (no filters applied)"
else
    echo "Applying query parameters: $FILTER_QUERY"
fi

# Execute the curl command with authorization and date parameters
curl -H "Authorization: Bearer $STRAPI_API_TOKEN" \
     "$API_URL/api/cases-export$FILTER_QUERY" \
     -o "$OUTPUT_FILE"

# Check if the export was successful
if [ $? -eq 0 ]; then
    echo "Export complete. Data saved to $OUTPUT_FILE"
else
    echo "Error: Export failed."
    exit 1
fi
