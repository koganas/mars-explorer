defmodule MarsExplorer do

  def execute([x, y], []), do: :ok # Create plateau
  def execute([x, y], [rover_commands | rest]) do # Add rover and send commands
     IO.inspect execute_for(rover_commands, [x, y])
     execute([x, y], rest)
  end

  def execute_for([initial_position, commands], [x, y]), do: start_new_position(initial_position, commands) # Add rover and send commands

  # Get current position and send each command
  def start_new_position(current_position, ""), do: current_position
  def start_new_position(current_position, <<one_command::binary-size(1), rest::binary>>) do
    new_position(current_position, one_command) |> start_new_position(rest)
  end

  # Check which instruction will be sent: move or rotate
  def new_position(<<position::binary-size(2), compass::binary-size(1)>>, "L"), do: rotate_left(position, compass)
  def new_position(<<position::binary-size(2), compass::binary-size(1)>>, "R"), do: rotate_right(position, compass)
  def new_position(<<position::binary-size(2), compass::binary-size(1)>> = current_position, "M"),
          do: move(current_position, compass)

  # def rotate_left(position, compass) do
  #   if compass = "N" do
  #     position <> "W"
  #   end
  #   if compass = "E" do
  #     position <> "N"
  #   end
  #   if compass = "W" do
  #     position <> "S"
  #   end
  #   if compass = "S" do
  #     position <> "E"
  #   end
  # end

  # def rotate_right(position, compass) do
  #   if compass = "N" do
  #     position <> "E"
  #   end
  #   if compass = "E" do
  #     position <> "S"
  #   end
  #   if compass = "W" do
  #     position <> "N"
  #   end
  #   if compass = "S" do
  #     position <> "W"
  #   end
  # end

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

  # def IO.gets("What's the size of the area you want to explore?")

  # Return rover final position
  defp inc(number), do: Integer.to_string(String.to_integer(number) + 1)
  defp dec(number), do: Integer.to_string(String.to_integer(number) - 1)

end


MarsExplorer.execute([5,5], [["12N", "LMLMLMLMM"], ["33E", "MMRMMRMRRM"]])
