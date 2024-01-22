from dronekit import connect, VehicleMode, Command, LocationGlobalRelative
from pymavlink import mavutil
import time



def display_letter(word):
    k = 0
    print(word)

    switch = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm','n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', "?"]

    for i in range(0, len(switch)):
        if word == switch[i]:
            k = i
            break
    
    return (800 + (k * 53)) + 20
    # vehicle.channels.overrides = {'8': (800 + (k * 53)) + 20}

def led_fillcolour():
        
    return 794+(27*53)+25
    # vehicle.channels.overrides={'8':794+(27*53)+25}

def clearled():
        
    return 794+(28*53)+25
    # vehicle.channels.overrides={'8':794+(28*53)+25}




# Connect to the vehicle
vehicle = connect('tcp:127.0.0.1:5762',baud=57600, wait_ready=True)

# Create a list to hold the commands
cmds = vehicle.commands

cmds.download()

cmds.clear()

# formation 1 target system,target component , sequence,frame ,command ,current,auto continue,parimemeter 1,parameter 2,  3 ,,,4 ,x,y,z
cmd1=Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_NAV_TAKEOFF, 0, 0, 0, 0, 0, 0,0,0,5)
cmds.add(cmd1)

cmd2=Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_DO_SET_SERVO, 0, 0, 5, display_letter("d"), 0, 0, 0, 0, 0)
cmds.add(cmd2)

cmd10= Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_NAV_WAYPOINT, 0, 0, 2, 0, 0, 0, 0, 0, 10)
cmds.add(cmd10)

cmd2=Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_DO_SET_SERVO, 0, 0, 5, display_letter("s"), 0, 0, 0, 0, 0)
cmds.add(cmd2)

cmd10= Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_NAV_WAYPOINT, 0, 0, 2, 0, 0, 0, 0, 0, 10)
cmds.add(cmd10)

cmd2=Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_DO_SET_SERVO, 0, 0, 5, clearled(), 0, 0, 0, 0, 0)
cmds.add(cmd2)

cmd10= Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_NAV_WAYPOINT, 0, 0, 2, 0, 0, 0, 0, 0, 10)
cmds.add(cmd10)

cmd2=Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_DO_SET_SERVO, 0, 0, 5, clearled(), 0, 0, 0, 0, 0)
cmds.add(cmd2)

cmd10= Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_NAV_WAYPOINT, 0, 0, 2, 0, 0, 0, 0, 0, 10)
cmds.add(cmd10)

cmd2=Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_DO_SET_SERVO, 0, 0, 5, display_letter("r"), 0, 0, 0, 0, 0)
cmds.add(cmd2)

cmd10= Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_NAV_WAYPOINT, 0, 0, 2, 0, 0, 0, 0, 0, 10)
cmds.add(cmd10)

cmd2=Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_DO_SET_SERVO, 0, 0, 5, display_letter("k"), 0, 0, 0, 0, 0)
cmds.add(cmd2)

cmd10= Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_NAV_WAYPOINT, 0, 0, 5, 0, 0, 0, 0, 0, 10)
cmds.add(cmd10)

# formation 2
cmd3 = Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_NAV_WAYPOINT, 0, 0, 0, 0, 0, 0, 0, 0, 5)
cmds.add(cmd3)

cmd4= Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_DO_SET_SERVO, 0, 0, 5, led_fillcolour(), 0, 0, 0, 0, 0)
cmds.add(cmd4)

cmd11= Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_NAV_WAYPOINT, 0, 0, 10, 0, 0, 0, 0, 0, 5)
cmds.add(cmd11)

# formation 3
cmd5 = Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_NAV_WAYPOINT, 0, 0, 0, 0, 0, 0, 0, 0, 7)
cmds.add(cmd5)

cmd6 = Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_DO_SET_SERVO, 0, 0, 5,led_fillcolour(), 0, 0, 0, 0, 0)
cmds.add(cmd6)

cmd12= Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_NAV_WAYPOINT, 0, 0, 10, 0, 0, 0, 0, 0, 7)
cmds.add(cmd12)

# formation 4
cmd7 = Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_NAV_WAYPOINT, 0, 0, 0, 0, 0, 0, 0, 0, 5)
cmds.add(cmd7)

cmd8 = Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_DO_SET_SERVO, 0, 0, 5, display_letter("t"), 0, 0, 0, 0, 0)
cmds.add(cmd8)

cmd13= Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_NAV_WAYPOINT, 0, 0, 2, 0, 0, 0, 0, 0, 5)
cmds.add(cmd13)

cmd8 = Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_DO_SET_SERVO, 0, 0, 5, clearled(), 0, 0, 0, 0, 0)
cmds.add(cmd8)

cmd13= Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_NAV_WAYPOINT, 0, 0, 2, 0, 0, 0, 0, 0, 5)
cmds.add(cmd13)

cmd8 = Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_DO_SET_SERVO, 0, 0, 5, clearled(), 0, 0, 0, 0, 0)
cmds.add(cmd8)

# land
cmd9 = Command( 0, 0, 0, mavutil.mavlink.MAV_FRAME_GLOBAL_RELATIVE_ALT, mavutil.mavlink.MAV_CMD_NAV_RETURN_TO_LAUNCH, 0, 0, 0, 0, 0, 0, 0, 0, 0)
cmds.add(cmd9)


print("Added 9 commands")
cmds.upload()
message=vehicle.message_factory.command_long_encode( 0, 0, mavutil.mavlink.MAV_CMD_MISSION_START, 0, 0, 0, 0, 0, 0, 0, 0)


vehicle.mode = VehicleMode("GUIDED")
vehicle.armed=True


while not vehicle.armed:
    print(" Waiting for arming...")
    time.sleep(1)
    vehicle.simple_takeoff(10)  # Take off to target altitude
    # vehicle.airspeed = 6

while vehicle.armed==True:
    print(" Altitude: ", vehicle.location.global_relative_frame.alt)
    if vehicle.location.global_relative_frame.alt >= 10 *0.95:
        print("Reached target altitude")
        break
    time.sleep(1)

vehicle.commands.next=0

vehicle.send_mavlink(message)
while not vehicle.armed:
    print(" Waiting for arming...")
    time.sleep(1)
time.sleep(10)