defmodule MarsExplorer do

  def exec([x, y], []), do: :ok # Create plateau
  def exec([x, y], [rover_commands | new_rover]) do # Add rovers and send commands
     IO.inspect exec_for(rover_commands, [x, y]) # Print values from exec_for()
     exec([x, y], new_rover)
  end

  def exec_for([initial_position, commands], [x, y]), do: start_new_position(initial_position, commands) # Add rover and send commands

  # Get current position
  def start_new_position(current_position, ""), do: current_position
  
  # Send commands to rover (attribute new positions) and launch other rover after
  def start_new_position(current_position, <<one_command::binary-size(1), new_rover::binary>>) do
    new_position(current_position, one_command) |> start_new_position(new_rover)
  end

  # Check which instruction will be sent: move or rotate - left/right
  def new_position(<<position::binary-size(2), compass::binary-size(1)>>, "L"), do: rotate_left(position, compass)
  def new_position(<<position::binary-size(2), compass::binary-size(1)>>, "R"), do: rotate_right(position, compass)
  def new_position(<<position::binary-size(2), compass::binary-size(1)>> = current_position, "M"),
          do: move(current_position, compass)

  # Rotate rover based on compass
  def rotate_left(position, "N"), do: position <> "W"
  def rotate_left(position, "E"), do: position <> "N"
  def rotate_left(position, "W"), do: position <> "S"
  def rotate_left(position, "S"), do: position <> "E"
  def rotate_right(position, "N"), do: position <> "E"
  def rotate_right(position, "E"), do: position <> "S"
  def rotate_right(position, "W"), do: position <> "N"
  def rotate_right(position, "S"), do: position <> "W"

  # Move rover based on position and orientation
  def move(<<x_position::binary-size(1), y_position::binary-size(1), compass::binary-size(1)>>, "N"), do: x_position <> inc(y_position) <> compass
  def move(<<x_position::binary-size(1), y_position::binary-size(1), compass::binary-size(1)>>, "E"), do: inc(x_position) <> y_position <> compass
  def move(<<x_position::binary-size(1), y_position::binary-size(1), compass::binary-size(1)>>, "W"), do: dec(x_position) <> y_position <> compass
  def move(<<x_position::binary-size(1), y_position::binary-size(1), compass::binary-size(1)>>, "S"), do: x_position <> dec(y_position) <> compass

  # Increase or decrease x or y value
  defp inc(number), do: Integer.to_string(String.to_integer(number) + 1)
  defp dec(number), do: Integer.to_string(String.to_integer(number) - 1)

  # Get values from prompt
  def get_x() do
    x = IO.gets "What's the size of X of the area? > "
    val = String.strip(x)
    String.to_integer(val)
  end

  def get_y() do
    y = IO.gets "What's the value of Y of the area? > "
    val = String.strip(y)
    String.to_integer(val)
  end

  def get_position() do
    pos = IO.gets "Set the initial position of the rover (ex. 34E) > "
    String.upcase(String.strip(pos))
  end

  def get_commands() do
    cmd = IO.gets "Set the instructions of the rover. M to move and L/R to rotate (ex. MMLRMLLMMR) > "
    String.upcase(String.strip(cmd))
  end

end

x = MarsExplorer.get_x()
y = MarsExplorer.get_y()
rover_position = MarsExplorer.get_position()
rover_commands = MarsExplorer.get_commands()

# Here i could send another question like "Do you want to add more rovers? Y/N"
# If the answer is positive, i would ask the questions again and get another rover position and commands.
# Return the results maybe using Enum.each(rover, fn ({key, value}) -> value end)
# For now, i am just asking the questions again

rover_position_2 = MarsExplorer.get_position()
rover_commands_2 = MarsExplorer.get_commands()

IO.inspect MarsExplorer.exec([x, y], [[rover_position, rover_commands], [rover_position_2, rover_commands_2]])