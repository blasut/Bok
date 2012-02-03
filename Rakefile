require 'rake'
require 'rake/testtask'

task :db_reset do
  db = 'db/test.db'
  if File.exists?(db) 
    File.delete(db)
  end
end

Rake::TestTask.new do |t|
  t.pattern = "test/**/*_test.rb"
  Rake::Task[:db_reset].invoke
end

