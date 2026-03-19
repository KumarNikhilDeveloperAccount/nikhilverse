export const playbooks = [
  {
    id: "windows_server_down",
    title: "Windows Server is Down / Unreachable",
    category: "Windows Server Support",
    symptoms: ["Server not pinging", "RDP fails", "Monitoring alerts generated", "Hosted applications are offline"],
    likelyCauses: ["Host crashed (VMware/Hyper-V)", "Network switch failure", "BSOD (Blue Screen)", "Stuck in reboot loop after patching", "Accidental shutdown"],
    intakeChecklist: [
      "Capture the exact server hostname and IP address.",
      "Check the exact minute the monitoring alert triggered.",
      "Identify the priority/tier of the applications hosted on this server to determine SLA.",
      "Identify if multiple servers went down simultaneously (indicates network/host issue vs OS issue)."
    ],
    troubleshootingSteps: [
      "Step 1: Perform a basic Ping test (ICMP) from your workstation and the jump server. Note if it times out or returns 'Destination Host Unreachable'.",
      "Step 2: Check the Virtualization Console. Log into VMware vSphere (vCenter) and search for the VM. Check its power state.",
      "Step 3: If powered off, check the vCenter tasks/events tab to see WHO or WHAT initiated the shutdown. Then right-click -> Power On.",
      "Step 4: If powered on but unresponsive, open the VM Web Console or Remote Console (VMRC).",
      "Step 5: Inside the console, check for a BSOD, a frozen Windows logo, or 'Applying Computer Settings' hang.",
      "Step 6: If responsive in console but network is down, open 'ncpa.cpl' inside the VM and verify the vNIC status (Connected vs Disconnected).",
      "Step 7: Check Event Viewer (eventvwr.msc) -> System Logs -> Filter by Error/Critical for unexpected shutdown codes."
    ],
    escalationTriggers: "If VM is inaccessible from vCenter, escalate to VMware/Data Center team. If networking confirms switch port is down, escalate to Network team.",
    changeControlConsiderations: "Emergency Change (eCAB) required if recreating the VM or restoring from backup entails modifying production active directory objects."
  },
  {
    id: "c_drive_full",
    title: "C: Drive is 100% Full",
    category: "Windows Server Support",
    symptoms: ["Server is sluggish", "Services fail to start", "Users cannot login", "Event IDs 2013 (Disk space low)"],
    likelyCauses: ["IIS Logs overgrown", "SCCM cache filled up", "CBS/Windows Update logs expanding", "User dumped files on Desktop", "Memory dump file (MEMORY.DMP) exists after crash"],
    intakeChecklist: [
      "Verify the exact free space percentage",
      "Check if any mission-critical application is currently halted due to disk space",
      "Identify the SLA for disk space alerts in the environment"
    ],
    troubleshootingSteps: [
      "Step 1: Log in via RDP or Console. Open File Explorer to visually confirm C: drive is red/full.",
      "Step 2: Run TreeSize Free or WinDirStat (if approved) as Administrator to scan C: drive and identify the largest directories.",
      "Step 3: If manual, check C:\\Windows\\Temp and C:\\Users\\[Default/Admin]\\AppData\\Local\\Temp.",
      "Step 4: Navigate to C:\\inetpub\\logs\\LogFiles (if IIS is installed) and compress or delete logs older than 30 days.",
      "Step 5: Check C:\\Windows\\SoftwareDistribution\\Download. Stop the Windows Update service (services.msc -> right-click Windows Update -> Stop), delete the folder contents, then restart the service.",
      "Step 6: Check C:\\Windows\\CbsTemp. Clear any massive .log or .cab files.",
      "Step 7: Open Server Manager -> Disk Management (diskmgmt.msc), check if there is unallocated space on Disk 0. If yes, right click C: partition -> Extend Volume."
    ],
    escalationTriggers: "If cleanup yields less than 2GB and Disk Management has no unallocated space, escalate to VMware/SAN team to increase the VMDK size.",
    changeControlConsiderations: "Standard Change Request usually required to add VMDK storage to a live production server."
  },
  {
    id: "change_management_cab",
    title: "Change Advisory Board (CAB) Process",
    category: "ITSM & Change Management",
    symptoms: ["New deployment required", "Infrastructure modification", "Patching schedule needed"],
    likelyCauses: ["Business requirement", "Security vulnerability", "Hardware lifecycle"],
    intakeChecklist: [
      "Ensure an RFC (Request for Change) record is submitted in ServiceNow/ServiceManager.",
      "Verify that the RFC includes an Implementation Plan, Test Plan, and Rollback/Backout Plan.",
      "Confirm Impact, Urgency, and Risk levels are calculated."
    ],
    troubleshootingSteps: [
      "Step 1 (Peer Review): The change owner submits the RFC. A technical peer reviews the implementation steps to ensure accuracy (e.g., verifying SCCM collection logic or PowerShell scripts).",
      "Step 2 (Risk Assessment): Evaluate the Risk. Does this touch a critical database? Does it require downtime?",
      "Step 3 (CAB Preparation): Compile the list of pending changes. The Change Manager organizes the CAB agenda.",
      "Step 4 (CAB Meeting): Represent the change on the call. The Change Manager will ask: 'What is the impact if this fails?', 'How long does rollback take?', 'Who tested this in lower environments?'",
      "Step 5 (Approval): Once approved by business and technical stakeholders, the RFC enters 'Scheduled' state.",
      "Step 6 (Execution & PIR): Post-execution, the owner updates the RFC to 'Review'. Perform a Post Implementation Review (PIR) to confirm no incidents were caused by this change."
    ],
    escalationTriggers: "If the change causes a P1/P2 incident, invoke the Rollback Plan immediately and notify the Incident Manager.",
    changeControlConsiderations: "All steps must be documented. Unapproved or undocumented changes are considered policy violations."
  },
  {
    id: "ad_account_lockout",
    title: "Active Directory Account Lockout",
    category: "Windows/AD Support",
    symptoms: ["User cannot log into workstation", "Service account fails to authenticate", "Repeated 4740 Event IDs"],
    likelyCauses: ["Wrong password cached on mobile device", "Stale credentials in Windows Credential Manager", "Mapped network drives with old passwords", "Brute force attack"],
    intakeChecklist: [
      "Ask the user what device or service they were using when it locked out.",
      "Verify their identity per organizational security policy.",
      "Determine if this is a standard user account or a high-privilege service account."
    ],
    troubleshootingSteps: [
      "Step 1: Open Active Directory Users and Computers (dsa.msc).",
      "Step 2: Ensure 'Advanced Features' is checked under the View menu to see full attributes.",
      "Step 3: Search for the user, right-click -> Properties -> Account tab.",
      "Step 4: Check if the 'Unlock account' box is visible. If yes, check it and click Apply.",
      "Step 5: If it locks out immediately again, download and run the Microsoft Account Lockout and Management Tools (LockoutStatus.exe).",
      "Step 6: Input the username to query all Domain Controllers. Identify which DC registered the bad password.",
      "Step 7: Connect to that DC, open Event Viewer -> Security Logs, and filter for Event Code 4740.",
      "Step 8: Look at the 'Caller Computer Name' in the event details. This identifies exactly which server, laptop, or mobile device is sending the bad password repeatedly.",
      "Step 9: Direct the user to that specific device to update their saved Wi-Fi, email, or stored credentials."
    ],
    escalationTriggers: "If a Service Account keeps locking out and causing application failure, engage the Application Owner and Security team.",
    changeControlConsiderations: "Resetting standard passwords is a Service Request. Changing Service Account passwords requires a Change Request due to potential application breakage."
  }
];
