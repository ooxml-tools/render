on run argv
	set input_file to (POSIX file (item 1 of argv))
	set output_file to (POSIX file (item 2 of argv))
	
	tell application "Microsoft Word"
        open input_file
		
		set activeDoc to active document
		save as activeDoc file name output_file file format format PDF
	end tell
end run