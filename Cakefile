
task 'build', 'Build extension code/', ->
  if_coffee ->
    ps = spawn("coffee", ["--output", JAVASCRIPTS_PATH,"--compile",COFFEESCRIPTS_PATH])
    ps.stdout.on('data', log)
    ps.stderr.on('data', log)
    ps.on 'exit', (code)->
      if code != 0
        console.log 'failed'

# Alternately, compile CoffeeScript programmatically
# CoffeeScript = require "coffee-script"
# CoffeeScript.compile fs.readFileSync filename

