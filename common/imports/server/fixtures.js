import loadLocalizationsFixtures from './fixtures/1_localizations.js'
import loadMenuEntriesFixtures from './fixtures/2_menu_entries.js'
import loadPagesFixtures from './fixtures/3_pages.js'
import loadImagesFixtures from './fixtures/4_images.js'
import loadOfficesFixtures from './fixtures/5_offices.js'
import loadProjectsFixtures from './fixtures/6_projects.js'
import loadTeamMembersFixtures from './fixtures/7_team_members.js'
import loadJobsFixtures from './fixtures/8_jobs.js'

export default loadFixtures = () => {
  loadLocalizationsFixtures()
  loadMenuEntriesFixtures()
  loadPagesFixtures()
  loadImagesFixtures()
  loadOfficesFixtures()
  loadProjectsFixtures()
  loadTeamMembersFixtures()
  loadJobsFixtures()
}
