Write-Output "TEST 1: Single message"
$body1 = @{ messages = @( @{ role = "user"; content = "Hello" } ) } | ConvertTo-Json -Depth 10
try {
    $r1 = Invoke-WebRequest -Uri "http://localhost:3000/api/chat" -Method Post -Body $body1 -ContentType "application/json"
    Write-Output "T1 Success: $($r1.Content)"
} catch {
    $err = ""
    if ($_.Exception.Response) { $err = (New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())).ReadToEnd() }
    Write-Output "T1 Fail: $err"
}

Write-Output "TEST 2: Follow up"
$body2 = @{ messages = @( @{ role = "user"; content = "Hello" }, @{ role = "assistant"; content = "Hi!" }, @{ role = "user"; content = "Tell me more." } ) } | ConvertTo-Json -Depth 10
try {
    $r2 = Invoke-WebRequest -Uri "http://localhost:3000/api/chat" -Method Post -Body $body2 -ContentType "application/json"
    Write-Output "T2 Success: $($r2.Content)"
} catch {
    $err = ""
    if ($_.Exception.Response) { $err = (New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())).ReadToEnd() }
    Write-Output "T2 Fail: $err"
}

Write-Output "TEST 3: Bad history format"
$body3 = @{ messages = @( @{ role = "user"; content = "Hello" }, @{ role = "user"; content = "Hi!" }, @{ role = "assistant"; content = "" } ) } | ConvertTo-Json -Depth 10
try {
    $r3 = Invoke-WebRequest -Uri "http://localhost:3000/api/chat" -Method Post -Body $body3 -ContentType "application/json"
    Write-Output "T3 Success! Recovered: $($r3.Content)"
} catch {
    $err = ""
    if ($_.Exception.Response) { $err = (New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())).ReadToEnd() }
    Write-Output "T3 Fail: $err"
}
