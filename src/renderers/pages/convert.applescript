on run argv
	set input_file to (POSIX file (item 1 of argv))
	set output_file to (POSIX file (item 2 of argv))
	
	tell application "Pages"
	launch
		set theDoc to open input_file
		export theDoc as PDF to file output_file
		close theDoc
	end tell
end run